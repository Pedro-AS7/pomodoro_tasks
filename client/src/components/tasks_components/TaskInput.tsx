export default function TaskInput() {

    return (
        <div className="w-full flex gap-3">
            <input type="text" placeholder="Add a new task" className="w-full p-2 bg-white border border-gray-300 rounded-xl " />
            <button className="px-4 py-1 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 active:scale-97">Add</button>
        </div>
    )
}