export type AdTexts = {
    title?: string;
    price?: string|number;
  category?: string; 
   description?: string; 
     contact?: string;
}
type Props = {
  defaultValues: AdTexts
}

export default function AdTextInput({ defaultValues }: Props) {
  return (
    <>
      <label htmlFor="titleIn">Title</label>
      <input 
        name="title" 
        id="titleIn" 
        type="text" 
        placeholder="Title" 
        maxLength={30} 
        defaultValue={defaultValues.title} 
      />

      <label htmlFor="priceIn">Price</label>
      <input 
        name="price" 
        id="priceIn" 
        type="number" 
        placeholder="Price" 
        defaultValue={defaultValues.price} 
      />

      <label htmlFor="categoryIn">Category</label>
      <select 
        name="category" 
        id="categoryIn" 
        defaultValue={defaultValues.category || "0"}
      >
        <option disabled value="0">Select category</option>
        <option value="Cars">Cars</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Properties">Properties</option>
      </select>

      <label htmlFor="descriptionIn">Description</label>
      <textarea 
        name="description" 
        id="descriptionIn" 
        placeholder="Description" 
        defaultValue={defaultValues.description} 
      />

      <label htmlFor="contactIn">Phone Number</label>
      <textarea 
        name="contact" 
        id="contactIn" 
        placeholder="Phone number +34123456" 
        defaultValue={defaultValues.contact} 
      />
    </>
  );
}
