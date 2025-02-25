import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; 
import { Controller, Control } from "react-hook-form";

function RTE({
  name,
  label,
  control,
  defaultValue = "",
}: {
  name: string;
  label: string;
  control: Control;
  defaultValue?: string;
}) {

  const { quill, quillRef } = useQuill();

  console.log(quill); 
  console.log(quillRef); 


  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={() => (
          <div ref={quillRef} />
        )}
      />
    </div>
  );
}

export default RTE;
