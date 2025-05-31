interface ProgressBarProps {
  rate: number;
}

export default function ProgressBar({ rate }: ProgressBarProps) {
  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">完成进度</h3>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-pink-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${rate}%` }}
        ></div>
      </div>
      <div className="mt-2 text-center text-sm">
        {rate >= 90 ? (
          <span className="text-green-600 font-medium">已完成 {rate}%</span>
        ) : (
          <span className="text-pink-600">还需完成 {90 - rate}% 才能继续</span>
        )}
      </div>
    </div>
  );
}