import Select from "react-select";

interface CustomSelectProps {
  onChange: (e: any) => void;
  options: Array<any>;
  value: string;
}

export default function CustomSelect({
  onChange,
  options,
  value,
}: CustomSelectProps) {
  const defaultValue = (options: any[], value: string) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div className="relative text-black">
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
      />
    </div>
  );
}
