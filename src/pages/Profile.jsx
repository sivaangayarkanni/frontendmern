export default function Profile() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #034C53, #007074, #F38C79, #FFC1B4)'}}>
      <div className="p-6 relative z-10">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <div className="bg-white rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <p>Profile settings and information</p>
        </div>
      </div>
    </div>
  )
}