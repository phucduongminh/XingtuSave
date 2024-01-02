import { Spends } from '../models/Spends';

const getMonth = (date: string) => {
    // Giả sử date có định dạng dd-mm-yyyy
    return date.slice(3, 5); // Trả về chuỗi từ vị trí 3 đến 4
};

const groupByCategory = (spends: Spends[]) => {
    // Tạo một đối tượng rỗng để lưu kết quả
    const result: Record<string, number> = {};
    // Duyệt qua mảng spends
    spends.reduce((acc, cur) => {
      // Lấy category của phần tử hiện tại
      const category = cur.category;
      // Kiểm tra xem category đã tồn tại trong đối tượng chưa
      if (acc[category]) {
        // Nếu có, cộng thêm money vào value
        acc[category] += cur.money;
      } else {
        // Nếu không, tạo một key mới với value là money
        acc[category] = cur.money;
      }
      // Trả về đối tượng cập nhật
      return acc;
    }, result); // Truyền result làm giá trị khởi tạo cho reduce
    
    // Chuyển đổi đối tượng thành mảng các đối tượng nhỏ hơn
    const arrayResult = Object.entries(result).map(([key, value]) => {
      // Trả về một đối tượng có category và totalMoney
      return { category: key, totalMoney: value };
    });
    // Trả về kết quả
    return arrayResult;
  };

  const groupByCategoryAndMonth = (spends: Spends[], month: string) => {
    // Lọc ra những dữ liệu có month bằng với tham số month
    const filtered = spends.filter((spend) => getMonth(spend.date) === month);
    // Tạo một đối tượng rỗng để lưu kết quả
    const result: Record<string, number> = {};
    // Duyệt qua mảng spends
    filtered.reduce((acc, cur) => {
      // Lấy category của phần tử hiện tại
      const category = cur.category;
      // Kiểm tra xem category đã tồn tại trong đối tượng chưa
      if (acc[category]) {
        // Nếu có, cộng thêm money vào value
        acc[category] += cur.money;
      } else {
        // Nếu không, tạo một key mới với value là money
        acc[category] = cur.money;
      }
      // Trả về đối tượng cập nhật
      return acc;
    }, result); // Truyền result làm giá trị khởi tạo cho reduce

    // Chuyển đổi đối tượng thành mảng các đối tượng nhỏ hơn
    const arrayResult = Object.entries(result).map(([key, value]) => {
      // Trả về một đối tượng có category và totalMoney
      return { category: key, totalMoney: value };
    });
    // Trả về kết quả
    return arrayResult;
  };

  export const filterAndGroup = (spends: Spends[], month: string) => {
    // Lọc ra những dữ liệu có income = 0
    const filtered = spends.filter((spend) => spend.income === 0);
    // Khai báo một biến để lưu kết quả
    let grouped;
    if (month === "0") {
      // Gom nhóm theo category
      grouped = groupByCategory(filtered);
    } else {
      // Gom nhóm theo category và month
      grouped = groupByCategoryAndMonth(filtered, month);
    }
    // Trả về kết quả
    return grouped;
  };

  const filterByControl = (spends: Spends[], control:number): Spends[] => {
    // Khai báo một biến để lưu kết quả
    let grouped: Spends[] = []; // assign an empty array as the default value
    if (control === 0) {
      // Gom nhóm theo category
      grouped = spends;
    } else if (control ===1){
      // Gom nhóm theo category và month
      grouped = spends.filter((spend) => spend.income === 1);
    } else if (control ===2){
      grouped = spends.filter((spend) => spend.income === 0);
    }
    // Trả về kết quả
    return grouped;
  };

  // Import the parse function from date-fns library
import { parse } from 'date-fns';

const filterByDate = (spends: Spends[], sDate:string,sDate1:string): Spends[] => {
  let grouped=spends;
  if(sDate!==''){
    // Parse the sDate string to a Date object
    const sDateObj = parse(sDate, 'dd-MM-yyyy', new Date());
    // Filter the spends array by comparing the date values
    grouped = grouped.filter((spend) => {
      // Parse the spend.date string to a Date object
      const spendDateObj = parse(spend.date, 'dd-MM-yyyy', new Date());
      // Compare the date values using the > operator
      return spendDateObj >= sDateObj;
    });
  }
  if(sDate1!==''){
    // Parse the sDate1 string to a Date object
    const sDate1Obj = parse(sDate1, 'dd-MM-yyyy', new Date());
    // Filter the spends array by comparing the date values
    grouped = grouped.filter((spend) => {
      // Parse the spend.date string to a Date object
      const spendDateObj = parse(spend.date, 'dd-MM-yyyy', new Date());
      // Compare the date values using the < operator
      return spendDateObj <= sDate1Obj;
    });
  }
  return grouped
}

  export  const filterByRequest = (spends: Spends[], control:number, category:string, sDate:string,sDate1:string): Spends[] => {
    let grouped= filterByControl(spends,control);
    if(category!==''){
      grouped = grouped.filter((spend) => spend.category === category);
    }
    grouped = filterByDate(grouped,sDate,sDate1)
    return grouped;
  };


  
  

