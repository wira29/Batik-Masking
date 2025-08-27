import { Grid2X2, Palette, TreePalm } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-black border-b border-gray-500/[0.5] sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <TreePalm className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Batik Dashboard</h1>
              <p className="text-sm text-gray-400">Admin Panel</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button className="flex items-center space-x-2 px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-700 transition-colors">
              <Palette className="w-4 h-4" />
              <span>Motifs</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-white">
              <Grid2X2 className="w-4 h-4" />
              <span>Model</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;