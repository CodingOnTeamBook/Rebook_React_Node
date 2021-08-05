export default function TransferDate(writeDate: string): string {
  // 작성 날짜
  const realWriteDate = new Date(writeDate);
  const calcWriteDate = parseInt(
    writeDate.substring(0, 10).split('-').join('')
  );

  // 현재 날짜
  const today = new Date();
  const year = today.getFullYear();
  const month =
    (today.getMonth() + 1) % 10 === today.getMonth() + 1
      ? '0' + (today.getMonth() + 1)
      : today.getMonth() + 1;
  const date =
    today.getDate() % 10 === today.getDate()
      ? '0' + today.getDate()
      : today.getDate();
  const standardDate = `${year}-${month}-${date}`;
  const calcStandardDate = parseInt(standardDate.split('-').join(''));

  if (calcStandardDate - calcWriteDate == 0) {
    return `오늘`;
  } else if (calcStandardDate - calcWriteDate < 7) {
    return `${calcStandardDate - calcWriteDate}일전`;
  } else {
    return realWriteDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
