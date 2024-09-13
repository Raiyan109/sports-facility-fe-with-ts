import { baseApi } from "@/redux/baseApi";

export const facilityApi = baseApi.enhanceEndpoints({ addTagTypes: ['Facilities'] }).injectEndpoints({
    endpoints: (builder) => ({
        getFacilities: builder.query({
            query: () => '/facility',
            providesTags: ['Facilities']
        }),
    })
})

export const { useGetFacilitiesQuery } = facilityApi