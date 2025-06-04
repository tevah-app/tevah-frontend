// import React from 'react';
// import { View } from 'react-native';

// interface ProgressBarProps {
//   currentStep: number;
//   totalSteps: number;
// }

// export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
//   return (
//     <View className="flex flex-row items-center w-[333px] h-[8px] mt-2 mb-2">
//       {[...Array(totalSteps)].map((_, i) => (
//         <View
//           key={i}
//           className={
//             `h-[8px] rounded-[5px] mx-0.5 "${i === 0 ? 'w-[16px]' : 'flex-1'}" ` +
//             (i < currentStep ? 'bg-[#090E24]' : 'bg-[#E0E0FF]')
//           }
//           style={{ flex: i === 0 ? undefined : 1, width: i === 0 ? 16 : undefined }}
//         />
//       ))}
//     </View>
//   );
// } 






import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="w-[333px] h-[8px] mt-2 mb-2 bg-[#E0E0FF] rounded-[5px] relative">
      {/* Filled progress */}
      <View
        className="h-full bg-[#6663FD] rounded-[5px]"
        style={{ width: `${progress}%` }}
      />

      {/* Moving circle */}
      <View
        className="absolute bg-[#090E24] rounded-full"
        style={{
          left: `${progress}%`,
          top: -6, // lifts it above the bar to make it stick out
          width: 20,
          height: 20,
          marginLeft: -10, // center it horizontally
        }}
      />
    </View>
  );
}

