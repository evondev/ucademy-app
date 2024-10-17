interface TestComponentProps {
  onRemoveText: (text: string) => void;
}
// CommentItemProps
// <CommentItem/> -> <CommentField/>
const TestComponent = ({ onRemoveText }: TestComponentProps) => {
  const handleRemoveText = () => {
    onRemoveText("text");
    // code more here
  };
  return <div onClick={() => {}}>TestComponent</div>;
};
// re-created function
// <TestComponent name="John" age={25} />
function handleComplexData({
  name,
  age,
  shool,
  city,
  country,
  phone,
  email,
  address,
  zip,
}: {
  name: string;
  age: number;
  shool: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
}) {
  return `${name} ${age} ${shool} ${city} ${country} ${phone} ${email} ${address} ${zip}`;
}
// handleComplexData("John", 25, "School", "City", "Country", "Phone", "Email", "Address", "Zip");
// improved: handleComplexData({name: "John", age: 25, shool: "School", city: "City", country: "Country", phone: "Phone", email: "Email", address: "Address", zip: "Zip"});

export default TestComponent;
