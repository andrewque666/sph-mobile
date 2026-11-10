import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST as createDepartmentRoute } from "@/app/api/website/departments/route";
import { PATCH as updateDepartmentRoute, DELETE as deleteDepartmentRoute } from "@/app/api/website/departments/[id]/route";
import { POST as createDoctorRoute } from "@/app/api/website/doctors/route";
import { PATCH as updateDoctorRoute, DELETE as deleteDoctorRoute } from "@/app/api/website/doctors/[id]/route";
import { db } from "@/lib/db";
import { jsonRequest, params, resetWebsiteTables, signInAs } from "../helpers";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

const department = {
  name: "Pediatrics",
  slug: "pediatrics",
  description: "Care for newborns, infants, children and adolescents.",
  chairman: "Dr. Josie Grace C. Castillo",
  hasResidency: true,
  facebookUrl: "https://www.facebook.com/pediasph",
  sortOrder: 0,
  published: true,
};

const doctor = {
  firstName: "Joefil",
  lastName: "Acosta",
  specialty: "",
  room: "SPICE 252",
  schedule: "M|T|TH|F 9-1pm",
  local: "2054",
  phone: "3381814",
  published: true,
};

async function createDepartment(overrides: Record<string, unknown> = {}) {
  const res = await createDepartmentRoute(jsonRequest("POST", "/api/website/departments", { ...department, ...overrides }));
  return { res, body: await res.json() };
}

async function createDoctor(departmentId: string, overrides: Record<string, unknown> = {}) {
  const res = await createDoctorRoute(jsonRequest("POST", "/api/website/doctors", { ...doctor, departmentId, ...overrides }));
  return { res, body: await res.json() };
}

beforeEach(async () => {
  await resetWebsiteTables();
  await signInAs("ADMIN");
});

describe("clinical departments CRUD", () => {
  it("creates a department", async () => {
    const { res, body } = await createDepartment();
    expect(res.status).toBe(201);
    expect(body).toMatchObject({ slug: "pediatrics", hasResidency: true, facebookUrl: "https://www.facebook.com/pediasph" });
  });

  it("stores an empty Facebook URL as null and rejects a malformed one", async () => {
    expect((await createDepartment({ facebookUrl: "" })).body.facebookUrl).toBeNull();
    const { res, body } = await createDepartment({ slug: "surgery", facebookUrl: "facebook dot com" });
    expect(res.status).toBe(400);
    expect(body.error.facebookUrl).toBeDefined();
  });

  it("returns 409 for a duplicate slug", async () => {
    await createDepartment();
    expect((await createDepartment({ name: "Pedia 2" })).res.status).toBe(409);
  });

  it("updates a department", async () => {
    const { body: created } = await createDepartment();
    const res = await updateDepartmentRoute(
      jsonRequest("PATCH", `/api/website/departments/${created.id}`, { ...department, chairman: "", hasResidency: false }),
      params(created.id)
    );
    expect(res.status).toBe(200);
    const saved = await db.clinicalDepartment.findUniqueOrThrow({ where: { id: created.id } });
    expect(saved.chairman).toBeNull();
    expect(saved.hasResidency).toBe(false);
  });

  it("refuses to delete a department that still has doctors, then deletes once empty", async () => {
    const { body: dept } = await createDepartment();
    const { body: doc } = await createDoctor(dept.id);

    const blocked = await deleteDepartmentRoute(jsonRequest("DELETE", "/x"), params(dept.id));
    expect(blocked.status).toBe(409);
    expect(await db.clinicalDepartment.count()).toBe(1);

    await deleteDoctorRoute(jsonRequest("DELETE", "/x"), params(doc.id));
    expect((await deleteDepartmentRoute(jsonRequest("DELETE", "/x"), params(dept.id))).status).toBe(200);
    expect((await deleteDepartmentRoute(jsonRequest("DELETE", "/x"), params(dept.id))).status).toBe(404);
  });

  it.each([null, "STAFF"] as const)("forbids %s from creating, updating and deleting", async (role) => {
    const { body: created } = await createDepartment();
    await signInAs(role);
    expect((await createDepartment({ slug: "other" })).res.status).toBe(403);
    expect((await updateDepartmentRoute(jsonRequest("PATCH", "/x", department), params(created.id))).status).toBe(403);
    expect((await deleteDepartmentRoute(jsonRequest("DELETE", "/x"), params(created.id))).status).toBe(403);
  });
});

describe("directory doctors CRUD", () => {
  it("creates a doctor in a department, nulling blank optional fields", async () => {
    const { body: dept } = await createDepartment();
    const { res, body } = await createDoctor(dept.id);
    expect(res.status).toBe(201);
    expect(body).toMatchObject({ lastName: "Acosta", departmentId: dept.id, specialty: null, room: "SPICE 252" });
  });

  it("requires names and a department", async () => {
    const { res, body } = await createDoctor("", { firstName: "", lastName: "" });
    expect(res.status).toBe(400);
    expect(Object.keys(body.error)).toEqual(expect.arrayContaining(["firstName", "lastName", "departmentId"]));
  });

  it("returns 409 when the department does not exist", async () => {
    const { res } = await createDoctor("no-such-department");
    expect(res.status).toBe(409);
  });

  it("updates a doctor, including moving departments", async () => {
    const { body: pedia } = await createDepartment();
    const { body: surgery } = await createDepartment({ name: "Surgery", slug: "surgery" });
    const { body: doc } = await createDoctor(pedia.id);

    const res = await updateDoctorRoute(
      jsonRequest("PATCH", `/api/website/doctors/${doc.id}`, { ...doctor, departmentId: surgery.id, schedule: "By appointment", published: false }),
      params(doc.id)
    );
    expect(res.status).toBe(200);
    const saved = await db.directoryDoctor.findUniqueOrThrow({ where: { id: doc.id } });
    expect(saved).toMatchObject({ departmentId: surgery.id, schedule: "By appointment", published: false });
  });

  it("returns 404 when updating or deleting an unknown doctor", async () => {
    const { body: dept } = await createDepartment();
    expect((await updateDoctorRoute(jsonRequest("PATCH", "/x", { ...doctor, departmentId: dept.id }), params("missing"))).status).toBe(404);
    expect((await deleteDoctorRoute(jsonRequest("DELETE", "/x"), params("missing"))).status).toBe(404);
  });

  it("forbids non-admins", async () => {
    const { body: dept } = await createDepartment();
    const { body: doc } = await createDoctor(dept.id);
    await signInAs("PATIENT");
    expect((await createDoctor(dept.id)).res.status).toBe(403);
    expect((await updateDoctorRoute(jsonRequest("PATCH", "/x", { ...doctor, departmentId: dept.id }), params(doc.id))).status).toBe(403);
    expect((await deleteDoctorRoute(jsonRequest("DELETE", "/x"), params(doc.id))).status).toBe(403);
    expect(await db.directoryDoctor.count()).toBe(1);
  });
});
