import { useCallback,useMemo,useState } from "react";
import FleetCard from "./FleetCard.jsx";
const initialForm={
    regNo:"",
    category:"Auto",
    driver:"",
    availability:"Available",
};
const categories=["Auto","Truck","Car","Bike"];

export default function Admin(){
    const[fleets,setFleets]=useState([]);
    const[form,setForm]=useState(initialForm);
    const isFormValid=useMemo(()=>{
        return(
            form.regNo.trim() &&
            form.category.trim() &&
            form.driver.trim() &&
            form.availability.trim()
        );
    }, [form]);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm((prev)=>({...prev,[name]:value}));
    };
    const handleAddFleet=(e)=>{
        e.preventDefault();
        if(!isFormValid){
            alert("Please fill all the fields");
            return;
        }
        const newFleet={
            id: crypto.randomUUID(),
            regNo: form.regNo,
            category: form.category,
            driver: form.driver,
            available: form.availability==="Available",
            image:"https://via.placeholder.com/160x100?text=Vehicle",
        };
        setFleets((prev)=>[newFleet,...prev]);
        setForm(initialForm);
    };
    const handleUpdateDriver=useCallback((id)=>{
        const newDriver=prompt("Enter new driver name:");
        if(newDriver && newDriver.trim()){
            setFleets((prev)=>
                prev.map((f)=>f.id===id ? {...f,driver:newDriver} : f)
            );
        }
    },[]);
    const toggleAvailability=useCallback((id)=>{
        setFleets((prev)=>
            prev.map((f)=>f.id===id ? {...f,available:!f.available} : f)
    );
    },[]);
    const deleteFleet=useCallback((id)=>{
        if (confirm("Delete this vehicle?")){
            setFleets((prev)=>prev.filter((f)=>f.id!==id));
        }
    },[]);
    return (
        <div className="admin-layout">
            <nav className="navbar">
                <h2>Admin Dashboard</h2>
            </nav>
            <aside className="sidebar card">
                <h3>Add New Fleet</h3>
                <form onSubmit={handleAddFleet}className="form-grid">
                    <label>
                        Vehicle Registration Number
                        <input type="text" name="regNo" value={form.regNo} onChange={handleChange} />
                    </label>
                    <label>
                        Category
                        <select name="category" value={form.category} onChange={handleChange}>
                            {categories.map((c)=>(
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Driver Name
                        <input type="text" name="driver" value={form.driver} onChange={handleChange} />
                    </label>
                    <label>
                        Availability Status
                        <select name="availability" value={form.availability} onChange={handleChange}>
                            <option >Available</option>
                            <option >Unavailable</option>
                        </select>
                    </label>
                    <button type="submit">Add Fleet</button>
                </form>
            </aside>
            <main className="content">
                <h3>Fleet</h3>
                <div className="grid">
                        {fleets.map((fleet)=>(
                            <FleetCard
                                key={fleet.id}
                                fleet={fleet}
                                onUpdateDriver={handleUpdateDriver}
                                onToggleAvailability={toggleAvailability}
                                onDelete={deleteFleet}
                                />
                        ))}
                </div>
            </main>
        </div>
    );
}