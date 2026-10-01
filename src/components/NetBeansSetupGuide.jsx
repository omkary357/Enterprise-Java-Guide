import React from 'react';
import { Database, Server, FolderPlus, Terminal, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function NetBeansSetupGuide() {
  const steps = [
    {
      num: "01",
      title: "Start Java DB Server",
      icon: Server,
      desc: "Open the Services tab (Window -> Services or Ctrl + 5). Expand 'Databases', right-click 'Java DB', and click 'Start Server'.",
      tip: "The NetBeans Output window will confirm: 'Apache Derby Network Server started and ready to accept connections on port 1527'."
    },
    {
      num: "02",
      title: "Create Database",
      icon: Database,
      desc: "Right-click 'Java DB' -> Click 'Create Database...'. Enter the Database Name (e.g., studentdb, QADB, RoomDB, inventorydb), User Name ('root' or 'app'), and Password ('root' or 'app'). Click OK.",
      tip: "NetBeans automatically creates the DB and adds a connected database node under Databases."
    },
    {
      num: "03",
      title: "Copy JDBC URL (Never Memorize It)",
      icon: Terminal,
      desc: "Right-click the generated connection node (e.g., jdbc:derby://localhost:1527/StudentDB) -> Click 'Properties'. Copy the Database URL directly.",
      tip: "Format is always: jdbc:derby://localhost:1527/<databaseName>"
    },
    {
      num: "04",
      title: "Execute SQL Commands Directly",
      icon: CheckCircle2,
      desc: "Right-click the connection node -> Click 'Execute Command...'. An SQL editor tab opens inside NetBeans. Paste your CREATE TABLE and INSERT statements.",
      tip: "Press the green 'Run SQL' icon or Ctrl + Shift + E to execute all queries at once."
    },
    {
      num: "05",
      title: "Add Project Libraries in 3 Clicks",
      icon: FolderPlus,
      desc: "Expand your project -> Right-click the 'Libraries' folder -> Click 'Add Library...' -> Select the required library -> Click 'Add Library'.",
      tip: "Common libraries: 'Java DB Driver' (for JDBC & Hibernate), 'JSTL 1.2' (for JSTL tags)."
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold mb-1">
          <Database className="w-4 h-4" />
          <span>SERVICES TAB &amp; DATABASE ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          NetBeans 8.2 &amp; Java DB Workflow Masterclass
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          How to run, create, configure, and connect to Apache Derby databases inside NetBeans 8.2 without third-party database clients or terminal commands.
        </p>
      </div>

      {/* 5-Step Visual Walkthrough */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-mono font-extrabold text-slate-700">{s.num}</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{s.desc}</p>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs text-emerald-400 font-mono">
                💡 <span className="text-slate-400">{s.tip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Library Reference Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-base font-bold text-white mb-3">External Library Requirements Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-semibold">
                <th className="p-3">Practical Category</th>
                <th className="p-3">Required Library</th>
                <th className="p-3">How to Add in NetBeans 8.2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-emerald-400">All JDBC Practicals (1C, 3B, 4C, 5C, 6A, 7B)</td>
                <td className="p-3 font-mono text-cyan-300">Java DB Driver</td>
                <td className="p-3">Right-click Libraries -&gt; Add Library -&gt; Java DB Driver</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-amber-400">JSTL Core Tags (Practical 6C)</td>
                <td className="p-3 font-mono text-cyan-300">JSTL 1.2</td>
                <td className="p-3">Right-click Libraries -&gt; Add Library -&gt; JSTL 1.2</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-400">File Upload (Practical 3A)</td>
                <td className="p-3 font-mono text-cyan-300">cos.jar (com.oreilly.servlet)</td>
                <td className="p-3">Right-click Libraries -&gt; Add JAR/Folder -&gt; select cos.jar</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-purple-400">Hibernate (Practical 10C)</td>
                <td className="p-3 font-mono text-cyan-300">Hibernate 4.3.x + Java DB Driver</td>
                <td className="p-3">Check Hibernate framework in wizard AND manually Add Library -&gt; Java DB Driver</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
