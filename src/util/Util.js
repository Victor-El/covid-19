export default function formatNumber(num) {
    return Math.floor(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
