import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

export function ErrorHandler(error: unknown) {
    if (isAxiosError(error) && error.response && error.response.data.message) {
        toast(error.response.data.message, {
            type: 'error',
            draggable: false,
        })
    } else {
        toast((error as Error).message, {
            type: 'error',
            draggable: false,
        })
    }
}
