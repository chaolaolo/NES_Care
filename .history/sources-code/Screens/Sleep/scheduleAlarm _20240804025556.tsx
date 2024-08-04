import AlarmManager from 'react-native-alarm-manager';

export const scheduleAlarm = async (time) => {
  try {
    // Kiểm tra và xin quyền nếu cần thiết (trên Android)
    const granted = await AlarmManager.checkAndRequestPermissions();
    if (!granted) {
      console.error('Không có quyền để đặt báo thức');
      return;
    }

    // Lên lịch báo thức
    const alarmId = await AlarmManager.scheduleAlarm({
      time: time, // Thời gian báo thức (miliseconds từ epoch)
      message: 'Báo thức của bạn!', // Tin nhắn báo thức
      repeatInterval: AlarmManager.INTERVAL_DAY, // Lặp lại hàng ngày
    });

    console.log(`Báo thức đã được đặt với ID: ${alarmId}`);
  } catch (error) {
    console.error('Lỗi khi đặt báo thức:', error);
  }
};

// Hàm hủy báo thức (tùy chọn)
export const cancelAlarm = async (alarmId) => {
  try {
    await AlarmManager.cancelAlarm(alarmId);
    console.log(`Báo thức với ID ${alarmId} đã được hủy`);
  } catch (error) {
    console.error('Lỗi khi hủy báo thức:', error);
  }
};
