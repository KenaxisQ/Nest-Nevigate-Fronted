export const DisplaySellLandFields = [
    {
      title: "Enter property title",
      placeHolder: "Enter property title",
      componetName: "Input",
      fieldName: "title",
      required: true,
    },
    {
        title: "Enter Property Type",
        placeHolder: "Enter Property Type",
        componetName: "Input",
        fieldName: "type",
        required: true,
    },
    {
        title: "Select Property Category",
        placeHolder: "Select Property Category",
        componetName: "Dropdown",
        fieldName: "propertyCategory",
        options: ["RESIDENTIAL","COMMERCIAL", "LAND", "PG"],
        required: true,
    },
    {
        title: "Select Property Listing",
        placeHolder: "Select Property Listing",
        componetName: "Dropdown",
        fieldName: "propertyListingFor",
        options: ["RENT","SALE", "LEASE"],
        required: true,
    },
    {
        title: "Enter Project Name",
        placeHolder: "Enter Project Name",
        componetName: "Input",
        fieldName: "projectName",
        required: true
    },
    // {
    //     title: "Select Furniture Status",
    //     placeHolder: "Select Furniture Status",
    //     componetName: "Dropdown",
    //     fieldName: "furnitureStatus",
    //     options:  ['FULLY_FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED'],
    //     required: true,
    // },
    // {
    //     title: "Select Furniture Status Description",
    //     placeHolder: "Select Furniture Status Description",
    //     componetName: "Dropdown",
    //     fieldName: "furnitureStatusDescription",
    // },
    {
        title: "Enter Super BuiltUp Area",
        placeHolder: "Enter Super BuiltUp Area",
        componetName: "Input",
        fieldName: "superBuiltupArea",
        type: "number"
    },
    // {
    //     title: "Select Carpet Area",
    //     placeHolder: "Select Carpet Area",
    //     componetName: "Dropdown",
    //     fieldName: "carpetArea",
    // },
    {
        title: "Enter Length",
        placeHolder: "Enter Length",
        componetName: "Input",
        required: true,
        fieldName: "length",
        type: "number"
    },
    {
        title: "Enter Width",
        placeHolder: "Enter Width",
        componetName: "Input",
        required: true,
        fieldName: "width",
        type: "number"
    },
    {
        title: "Enter Advance",
        placeHolder: "Enter Advance",
        componetName: "Input",
        required: true,
        fieldName: "advance",
        type: "number"
    },
    {
        title: "Negotiable",
        placeHolder: "Negotiable",
        componetName: "Dropdown",
        fieldName: "isNegotiable",
        options: ["True", "False"]
    },
    // {
    //     title: "Enter Owner Name",
    //     placeHolder: "Enter Owner Name",
    //     componetName: "Input",
    //     required: true,
    //     fieldName: "owner",
    // },
    {
      title: "Select Property Status",
      placeHolder: "Select property Status",
      componetName: "Dropdown",
      required: true,
      fieldName: "status",
      options: ['SOLD', 'AVAILABLE', 'RENTED','LEASED']
    },
    {
      title: "Select Featured",
      placeHolder: "Select Featured",
      componetName: "Dropdown",
      fieldName: "isFeatured",
      options: ["True", "False"]
    },
    {
      title: "Enter Primary Contact",
      placeHolder: "Enter Primary Contact",
      componetName: "Input",
      fieldName: "primaryContact",
      required: true
    },
    {
        title: "Enter Secondary Contact",
        placeHolder: "Enter Secondary Contact",
        componetName: "Input",
        fieldName: "secondaryContact",
      },
    // {
    //     title: "Enter State",
    //     placeHolder: "Enter State",
    //     componetName: "Input",
    //     fieldName: "state",
    // },
    // {
    //     title: "Enter Division",
    //     placeHolder: "Enter Division",
    //     componetName: "Input",
    //     fieldName: "revenueDivision",
    // },
    {
        title: "Enter Mandal",
        placeHolder: "Enter Mandal",
        componetName: "Input",
        fieldName: "mandal",
    },
    {
        title: "Enter Village",
        placeHolder: "Enter Village",
        componetName: "Input",
        fieldName: "village",
    },
    {
        title: "Enter Zip",
        placeHolder: "Enter Zip",
        componetName: "Input",
        fieldName: "zip",
    },
    {
        title: "Enter Address",
        placeHolder: "Enter Address",
        componetName: "Input",
        required: true,
        fieldName: "address",
    },
    {
        title: "Enter Facing",
        placeHolder: "Enter Facing",
        componetName: "Dropdown",
        fieldName: "facing",
        options: ["EAST", "WEST", "NORTH", "SOUTH", "NORTH_EAST", "NORTH_WEST", "SOUTH_EAST", "SOUTH_WEST"]
    },

];

export const DisplaySellCommercialFields = [...DisplaySellLandFields,
    {
        title: "Select Furniture Status",
        placeHolder: "Select Furniture Status",
        componetName: "Dropdown",
        fieldName: "furnitureStatus",
        options:  ['FULLY_FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED'],
        required: true,
    },
    {
        title: "Select Furniture Status Description",
        placeHolder: "Select Furniture Status Description",
        componetName: "Input",
        fieldName: "furnitureStatusDescription",
    },
    {
        title: "Enter Carpet Area",
        placeHolder: "Enter Carpet Area",
        componetName: "Input",
        fieldName: "carpetArea",
        type: "number"
    },
    {
        title: "Move In Date",
        placeHolder: "Move In Date",
        componetName: "Input",
        fieldName: "moveInDate",
        type:"date"
      },
];

export const DisplaySellResidentialFields = [...DisplaySellLandFields,
    {
        title: "Select Furniture Status",
        placeHolder: "Select Furniture Status",
        componetName: "Dropdown",
        fieldName: "furnitureStatus",
        options:  ['FULLY_FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED'],
        required: true,
    },
    {
        title: "Select Furniture Status Description",
        placeHolder: "Select Furniture Status Description",
        componetName: "Input",
        fieldName: "furnitureStatusDescription",
        required: true,
    },
    {
        title: "Enter Carpet Area",
        placeHolder: "Enter Carpet Area",
        componetName: "Input",
        fieldName: "carpetArea",
        type: "number",
        required: true,

    },
    {
        title: "Enter No of BathRooms",
        placeHolder: "No of Bathrooms",
        componetName: "Input",
        fieldName: "noOfBathrooms",
        required: true,
        type: "number"
    },
    {
        title: "Enter No of BedRooms",
        placeHolder: "No of BedRooms",
        componetName: "Input",
        fieldName: "noOfBedrooms",
        required: true,
        type: "number"
    },
    {
        title: "Enter No of Balconies",
        placeHolder: "No of Balconies",
        componetName: "Input",
        fieldName: "noOfBalconies",
        type: "number",
        required: true,
    },
    {
        title: "Enter No of Rooms",
        placeHolder: "No of Rooms",
        componetName: "Input",
        fieldName: "noOfRooms",
        type: "number",
        required: true,
    },
    {
    title: "Enter Pooja Rooms",
    placeHolder: "Pooja Rooms",
    componetName: "Input",
    fieldName: "poojaRoom",
    type: "number",
    required: true
    },
    {
        title: "Move In Date",
        placeHolder: "Move In Date",
        componetName: "Input",
        fieldName: "moveInDate",
        type:"date",
        required: true
    },
];
