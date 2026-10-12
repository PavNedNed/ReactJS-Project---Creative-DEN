function DropDownButton({
    onChange
}) {

    return (
        <div className="field">
            <label htmlFor="category">Category</label>
            <select 
                id="category" 
                name="category"
                onChange={onChange}
                defaultValue="all">
                    <option value="all" >Show all graphics</option>
                    <option value="vector" >Vector</option>
                    <option value="raster" >Raster</option>
                    <option value="logo" >Logo</option>
                    <option value="web" >Web</option>
                    <option value="caricature" >Caricature</option>
            </select>
            <p className="field-hint">Dropdown options: vector, raster, logo, web, caricature.</p>
        </div>
    );
}

export default DropDownButton;