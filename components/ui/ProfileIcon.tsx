export default function ProfileIcon({ name }: { name: string }) {
  return (
    <div className="avatar">
      <div className="bg-blue-500 ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring-2 ring-offset-2 flex items-center justify-center relative">
        <span className="text-6xl block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{name.charAt(0).toUpperCase()}</span>
      </div>
    </div>
  );
}
