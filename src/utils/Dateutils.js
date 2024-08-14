

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    return `${day}${suffix} ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} `;
  };

export default formatDate