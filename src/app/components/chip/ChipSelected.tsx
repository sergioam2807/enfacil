interface ActivityChipProps {
  activity: string;
  onRemove: (activity: string) => void;
}

export const ActivityChip: React.FC<ActivityChipProps> = ({
  activity,
  onRemove,
}) => {
  return (
    <div className="inline-flex items-center bg-custom-blue text-white rounded-full px-4 py-1 text-sm font-medium mr-2 mb-2">
      <span>{activity}</span>
      <button
        onClick={() => onRemove(activity)}
        className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-inherit focus:outline-none"
      >
        x
      </button>
    </div>
  );
};
