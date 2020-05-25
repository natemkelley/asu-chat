 export function createBatteryLevel(level) {
     return {
         level: level,
         timeStamp: new Date(),
         type: 'battery'
     }
 }

 export function createBinaryLevel(level) {
     return {
         level: !level,
         timeStamp: new Date(),
         type: 'binary'
     }
 }

 export function createTextLevel(level) {
     return {
         level: level,
         timeStamp: new Date(),
         type: 'text'
     }
 }