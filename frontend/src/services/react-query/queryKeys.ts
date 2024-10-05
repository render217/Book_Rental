export enum QUERY_KEYS {
    // USER KEYS
    GET_CURRENT_USER = "getCurrentUser",

    GET_OWNERS = "getOwners",

    // BOOK CATALOG KEYS
    GET_BOOKS_CATALOG = "getBooksCatalog",
    GET_BOOKS_CATALOG_RENTER = "getBooksCatalogForRenter",
    GET_BOOKS_STATISTICS = "getBooksStatistics",

    // BOOK INVENTORY KEYS
    GET_BOOKS_INVENTORY = "getBooksInventory",
    GET_BOOK_INVENTORY_STATISTICS = "getBookInventoryStatistics",
    SEARCH_BOOK_IN_INVENTORY = "searchBookInInventory",
    // BOOK RENTAL KEYS
    GET_RENTALS = "getRentals",

    // REVENUE KEYS
    GET_OWNERS_REVENUE = "getOwnerRevenue",
    GET_OWNERS_MINE_REVENUES = "getOwnerRevenues",

    GET_REVENUE_SUMMARY = "getRevenueSummary",
}
