import { DoctorDirectory } from "@/components/doctors/doctor-directory";

export default function DoctorsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">Doctor Directory</h2>
      <DoctorDirectory />
    </div>
  );
}
