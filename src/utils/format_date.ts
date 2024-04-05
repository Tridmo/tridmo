export default function formatDate(date: Date | string): string {
    const dd = new Date(date).getDate()
    const mm = new Date(date).getMonth() + 1
    const yyyy = new Date(date).getFullYear()

    return `${dd < 10 ? '0' + dd : dd}`
        + `.${mm < 10 ? '0' + mm : mm}`
        + `.${yyyy}`
}