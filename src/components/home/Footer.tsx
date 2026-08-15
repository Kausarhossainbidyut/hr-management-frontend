import { Briefcase, Globe, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">HR Pro</span>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The most comprehensive HR management solution for modern businesses. 
              Streamline operations and empower your workforce.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all border border-gray-700/50 hover:border-blue-500 hover:scale-110"
                >
                  <Globe className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Features</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Security</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HR Pro Management System. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-gray-500">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-sm text-gray-500">for better workplaces</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
