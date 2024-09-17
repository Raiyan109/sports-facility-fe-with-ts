export type TFacility = {
    _id: string
    name: string
    description: string
    pricePerHour: number
    location: string
    isDeleted: boolean
    image: string
}

export type TUpdateFacility = {
    name: string
    description: string
    pricePerHour: number
    location: string
    // image: string
}

export type TSignUpFormValues = {
    name: string
    email: string
    password: string
    phone: string
    role: string
    address: string
}

export type TLoginFormValues = {
    email: string
    password: string
}