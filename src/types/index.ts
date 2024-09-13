export type TFacility = {
    _id: string
    name: string
    description: string
    pricePerHour: number
    location: string
    isDeleted: boolean
    image: string
}

export type TSignUpFormValues = {
    name: string
    email: string
    password: string
    phone: string
    role: string
    address: string
}