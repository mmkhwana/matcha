class ConvertService {
  static Age (age) {
    return (age === '25 & under') ? 25 : (age === '35 & under') ? 35 : (age === '45 & under') ? 45 : (age === 'Above 45') ? 46 : 0
  }
}

export default ConvertService
