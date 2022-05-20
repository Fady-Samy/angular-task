export interface NewProduct {
    Id?: number,
    BrandId?: number,
    CategoryId?: number,
    NameAr: string,
    NameEn: string,
    Code: string,
    Barcode: string,
    RunningBalance: number,
    Points: number,
    MinQuantityAlarm: number,
    MaxQuantityAlarm: number,
    PolicyAr: string,
    PolicyEn: string,
    DescriptionAr: string,
    DescriptionEn: string,
    ProductPhoto: string,
    Photo: string,
    UserId: string,
    IsActive: boolean,
    EndUserPrice: number
}