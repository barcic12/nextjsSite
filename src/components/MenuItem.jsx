import Link from "next/link";

export default function MenuItem({ title, address, Icon, onClick, target }) {
  return (
    <div className="bg-green-100 rounded-full">
      <Link
        href={address}
        className="hover:text-amber-300"
        onClick={onClick || undefined}
        target={target || undefined}
      >
        <Icon className="text-2xl sm:hidden" />
        <p className="hidden sm:inline text-sm">{title}</p>
      </Link>
    </div>
  );
}
