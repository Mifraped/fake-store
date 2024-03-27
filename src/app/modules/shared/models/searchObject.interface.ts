export interface SearchObject {
    productName: string | undefined,

    womenClothes: boolean,
    menClothes: boolean,
    jewelry: boolean,
    electronics: boolean,

    minPrice: number,
    maxPrice: number,
    minRating: number,
    maxRating: number
}