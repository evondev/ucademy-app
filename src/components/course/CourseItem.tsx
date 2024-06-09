import Image from "next/image";
import Link from "next/link";

const CourseItem = () => {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg">
      <Link href="#" className="block h-[200px]">
        <Image
          src="https://images.unsplash.com/photo-1716881763995-097b7a68ea3d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded"
          sizes="@media (min-width: 640px) 300px, 100vw"
          priority
        />
      </Link>
    </div>
  );
};

export default CourseItem;
