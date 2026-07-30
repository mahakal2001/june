type Props = {
  icon: React.ElementType;
  bg: string;
  color: string;
};

export default function KPIIcon({
  icon: Icon,
  bg,
  color,
}: Props) {
  return (
    <div
      className={`
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        ${bg}
        shadow-sm
        transition-all
        duration-300
        group-hover:scale-110
        group-hover:rotate-6
      `}
    >
      <Icon
        className={`h-6 w-6 ${color}`}
        strokeWidth={2.2}
      />
    </div>
  );
}