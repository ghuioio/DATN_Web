function up(type) {
  return `@media (min-width: ${getSize(type)}px)`
}
function down(type) {
  return `@media (max-width: ${getSize(type)}px)`
}

function getSize(type) {
  switch (type) {
    case 'xs': return 0
    case 'sm': return 600
    case 'md': return 900
    case 'lg': return 1200
    case 'xl': return 1536
  }
}

export default { up, down }