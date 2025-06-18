"use client";

interface MenuBoardProps {
  height: string;
  className?: string;
}

export function MenuBoard({ height, className }: MenuBoardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 overflow-y-auto ${className}`}
      style={{ height }}
    >
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-200 rounded-lg mb-2" />
            <h3 className="font-semibold">Menu Item {item}</h3>
            <p className="text-sm text-gray-600">Description of menu item</p>
            <p className="text-lg font-bold mt-2">$9.99</p>
          </div>
        ))}
      </div>
    </div>
  );
} 