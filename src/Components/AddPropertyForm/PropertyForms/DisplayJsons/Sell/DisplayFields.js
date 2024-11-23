export const DisplaySellLandFields = [
    {
      title: "Enter property title",
      placeHolder: "Enter property title",
      componetName: "Input",
      fieldName: "title",
      required: true,
    },
    {
        title: "Select Property Type",
        placeHolder: "Select Property Type",
        componetName: "Dropdown",
        fieldName: "type",
    },
    {
        title: "Select Property Category",
        placeHolder: "Select Property Category",
        componetName: "Dropdown",
        fieldName: "propertyCategory",
    },
    {
        title: "Select Property Listing",
        placeHolder: "Select Property Listing",
        componetName: "Dropdown",
        fieldName: "propertyListingFor",
    },
    {
        title: "Enter Project Name",
        placeHolder: "Enter Project Name",
        componetName: "Input",
        required: true,
        fieldName: "projectName",
    },
    {
        title: "Select Private SubProperty",
        placeHolder: "Select Private SubProperty",
        componetName: "Dropdown",
        fieldName: "privateSubProperty",
    },
    {
        title: "Select Furniture Status",
        placeHolder: "Select Furniture Status",
        componetName: "Dropdown",
        fieldName: "furnitureStatus",
    },
    {
        title: "Select Furniture Status Description",
        placeHolder: "Select Furniture Status Description",
        componetName: "Dropdown",
        fieldName: "furnitureStatusDescription",
    },
    {
        title: "Select Super BuiltUp Area",
        placeHolder: "Select Super BuiltUp Area",
        componetName: "Dropdown",
        fieldName: "super_builtup_area",
    },
    {
        title: "Select Carpet Area",
        placeHolder: "Select Carpet Area",
        componetName: "Dropdown",
        fieldName: "carpet_area",
    },
    {
        title: "Enter Dimensions",
        placeHolder: "Enter Dimensions",
        componetName: "Input",
        required: true,
        fieldName: "dimensions",
    },
    {
        title: "Enter Price",
        placeHolder: "Enter Pice",
        componetName: "Input",
        required: true,
        fieldName: "price",
    },
    {
        title: "Enter Advance",
        placeHolder: "Enter Advance",
        componetName: "Input",
        required: true,
        fieldName: "advance",
    },
    {
        title: "Negotiable",
        placeHolder: "Negotiable",
        componetName: "Dropdown",
        fieldName: "isNegotiable",
    },
    {
        title: "Enter Owner Name",
        placeHolder: "Enter Owner Name",
        componetName: "Input",
        required: true,
        fieldName: "owner",
    },
    {
      title: "Enter Property Status",
      placeHolder: "Enter property Status",
      componetName: "Input",
      required: true,
      fieldName: "propertyStatus",
    },
    {
      title: "Select Featured",
      placeHolder: "Select Featured",
      componetName: "Dropdown",
      fieldName: "isFeatured",
    },
    {
      title: "Enter Contact",
      placeHolder: "Enter Contact",
      componetName: "Input",
      fieldName: "contact",
    },
    {
        title: "Enter State",
        placeHolder: "Enter State",
        componetName: "Input",
        fieldName: "state",
    },
    {
        title: "Enter Division",
        placeHolder: "Enter Division",
        componetName: "Input",
        fieldName: "division",
    },
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
    }
];

export const DisplaySellCommercialFields = [...DisplaySellLandFields];

export const DisplaySellResidentialFields = [...DisplaySellLandFields,
  {
  title: "No of BathRooms",
  placeHolder: "No of Bathrooms",
  componetName: "Input",
  fieldName: "noOfBathrooms",
  required: true,
},
{
    title: "No of Balconies",
    placeHolder: "No of Balconies",
    componetName: "Input",
    fieldName: "balconies",
},
{
    title: "No of Rooms",
    placeHolder: "No of Rooms",
    componetName: "Input",
    fieldName: "rooms",
},
{
  title: "Pooja Rooms",
  placeHolder: "Pooja Rooms",
  componetName: "Input",
  fieldName: "poojaRooms",
}
];
