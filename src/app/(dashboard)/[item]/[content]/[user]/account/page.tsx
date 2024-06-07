const page = ({ params, searchParams }: { params: any; searchParams: any }) => {
  console.log(`params`, params);
  console.log(`searchParams`, searchParams);
  return <div>Inside</div>;
};

export default page;
