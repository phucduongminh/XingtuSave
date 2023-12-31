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
    // Duyệt qua mảng filtered
    filtered.reduce((acc, cur) => {
      // Lấy category của phần tử hiện tại
      const category = cur.category;
      // Tạo một key là sự kết hợp của category và month
      const key = `${category}-${month}`;
      // Kiểm tra xem key đã tồn tại trong đối tượng chưa
      if (acc[key]) {
        // Nếu có, cộng thêm money vào value
        acc[key] += cur.money;
      } else {
        // Nếu không, tạo một key mới với value là money
        acc[key] = cur.money;
      }
      // Trả về đối tượng cập nhật
      return acc;
    }, result); // Truyền result làm giá trị khởi tạo cho reduce
    // Chuyển đổi đối tượng thành mảng các đối tượng nhỏ hơn
    const arrayResult = Object.entries(result).map(([key, value]) => {
      // Tách key thành category và month
      const [category, month] = key.split("-");
      // Trả về một đối tượng có category và totalMoney
      return { category, totalMoney: value };
    });
    // Trả về kết quả
    return arrayResult;
  };

  const filterAndGroup = (spends: Spends[], month: string) => {
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

  export default filterAndGroup

  
  

