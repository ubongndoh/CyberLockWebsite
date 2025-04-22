import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ColorDemo() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">CyberLockX Color Palette Demo</h1>
        
        {/* Purple Background Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Purple Backgrounds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pure Purple Background */}
            <Card>
              <CardHeader className="bg-[hsl(266,63%,69%)] text-white">
                <CardTitle>Pure Purple Background</CardTitle>
                <CardDescription className="text-white/90">Using HSL value directly</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>This card uses the exact purple color from our chart-4 variable (266 63% 69%).</p>
              </CardContent>
              <CardFooter>
                <Button className="bg-[hsl(266,63%,69%)] hover:bg-[hsl(266,63%,60%)]">Purple Button</Button>
              </CardFooter>
            </Card>
            
            {/* Using chart-4 variable */}
            <Card>
              <CardHeader className="bg-chart-4 text-white">
                <CardTitle>Using chart-4 Variable</CardTitle>
                <CardDescription className="text-white/90">Referencing CSS variable</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>This card uses the chart-4 variable which is defined as a purple color.</p>
              </CardContent>
              <CardFooter>
                <Button className="bg-chart-4 hover:opacity-90">Chart-4 Button</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        {/* Purple Gradients Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Purple Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Purple to Blue Gradient */}
            <div className="h-64 rounded-lg bg-gradient-to-r from-chart-4 to-blue-500 p-6 flex items-center justify-center text-white text-center">
              <div>
                <h3 className="text-xl font-bold mb-2">Purple to Blue Gradient</h3>
                <p>Perfect for hero sections and CTAs</p>
              </div>
            </div>
            
            {/* Purple to Pink Gradient */}
            <div className="h-64 rounded-lg bg-gradient-to-br from-chart-4 to-pink-500 p-6 flex items-center justify-center text-white text-center">
              <div>
                <h3 className="text-xl font-bold mb-2">Purple to Pink Gradient</h3>
                <p>Great for attention-grabbing sections</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Text and Accents Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Text and Accent Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-chart-4 text-xl font-bold mb-2">Purple Headlines</h3>
                <p>Using purple for important text elements can help them stand out.</p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-block px-3 py-1 bg-chart-4 text-white rounded-full text-sm">Tag</span>
                  <span className="inline-block px-3 py-1 bg-chart-4/20 text-chart-4 rounded-full text-sm">Label</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-black text-xl font-bold mb-2">Border Accents</h3>
                <div className="border-l-4 border-chart-4 pl-4 py-2">
                  <p>Sidebar content or quotes can use purple borders.</p>
                </div>
                <div className="mt-4 border border-chart-4 rounded-md p-4">
                  <p>Bordered container with purple outline</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-black text-xl font-bold mb-2">Interactive Elements</h3>
                <button className="w-full mb-3 bg-white border border-chart-4 text-chart-4 hover:bg-chart-4 hover:text-white transition-colors py-2 rounded-md">
                  Outline Button
                </button>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                  <div className="bg-chart-4 h-4 rounded-full w-3/4"></div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-chart-4 rounded-full"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                  </div>
                  <span className="ml-3">Toggle switch</span>
                </label>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}