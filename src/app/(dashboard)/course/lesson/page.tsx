const page = ({ params, searchParams }: { params: any; searchParams: any }) => {
  console.log(`params`, params);
  console.log(`searchParams`, searchParams);
  return <div>Lesson of course</div>;
};

export default page;
