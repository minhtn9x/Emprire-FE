const Name = cell => {
  return cell.value ? cell.value : ""
}

const Brand = cell => {
  return cell.value ? cell.value : ""
}

const Model = cell => {
  return cell.value ? cell.value : ""
}

const Symptoms = cell => {
  return cell.value ? cell.value : ""
}

const IntendedMinutes = cell => {
  return cell.value ? cell.value + " phút" : ""
}

export { Name, Symptoms, IntendedMinutes, Brand, Model }
