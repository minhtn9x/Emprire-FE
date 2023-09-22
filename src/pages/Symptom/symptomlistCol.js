const Name = cell => {
  return cell.value ? cell.value : ""
}

const IntendedMinute = cell => {
  return cell.value ? cell.value + " phút" : ""
}

export { Name, IntendedMinute }
