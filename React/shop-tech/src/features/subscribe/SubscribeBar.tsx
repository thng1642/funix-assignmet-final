

export default function SubscribeBar() {
    return (
        <div className="w-full h-[50px] flex flex-row">
            <div className="w-[80%] h-full flex items-center border border-slate-500">
                <input type="text" className="w-full pl-3 focus:outline-none" placeholder="Enter your email address" name="subscribe" id="sub-bar" />
            </div>
            <button className="bg-[#383838] w-[100px] text-slate-50 tracking-wide">Subscribe</button>
        </div>
    );
};