const useDate = (date) => {
    const fullDate = new Date(date.replace(/-/g, "/"));
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth() + 1;
    const day = fullDate.getDate();
  
    const dateFormated =
      ("0" + month).slice(-2) +
      "/" +
      ("0" + day).slice(-2) +
      "/" +
      year;
  
    return dateFormated;
  };
  
  export default useDate;
  