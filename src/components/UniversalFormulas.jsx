import React from 'react';
import { Zap, Database, Cpu, Layers, Server, Terminal, Check } from 'lucide-react';

export default function UniversalFormulas() {
  return (
    <div className="space-y-8">
      
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-indigo-900/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-semibold mb-1">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>ZERO-MEMORIZATION ARCHITECTURAL BLUEPRINTS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          The 5 Universal Enterprise Java Formulas
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          Instead of memorizing lines of boilerplate code, internalize these five repeatable design patterns. Every practical from 1A through 10C is a variation of these five core templates.
        </p>
      </div>

      {/* Formula 1: The 4-Step Standard Servlet */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/30">
            F1
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Formula 1: The 4-Step Standard Servlet Recipe</h2>
            <p className="text-xs text-slate-400">Used in: 1A (Calculator), 1B (Login), 2A (Dispatcher), 3A (Upload), 3B (MCQ)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-blue-400">Step 1: Content Type</span>
            <p className="text-xs text-slate-300 mt-1 font-mono">response.setContentType("text/html");</p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-blue-400">Step 2: Output Stream</span>
            <p className="text-xs text-slate-300 mt-1 font-mono">PrintWriter out = response.getWriter();</p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-blue-400">Step 3: Extract &amp; Parse</span>
            <p className="text-xs text-slate-300 mt-1 font-mono">request.getParameter("key");</p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-blue-400">Step 4: Output HTML</span>
            <p className="text-xs text-slate-300 mt-1 font-mono">out.println("&lt;h2&gt;...&lt;/h2&gt;");</p>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto">
{`@WebServlet("/MyServlet")
public class MyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        // 1. Read input
        String input = request.getParameter("username");
        
        // 2. Perform business logic
        out.println("<h2>Hello " + input + "</h2>");
    }
}`}
        </pre>
      </div>

      {/* Formula 2: The 5-Step JDBC Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
            F2
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Formula 2: The 5-Step JDBC Pipeline for Java DB</h2>
            <p className="text-xs text-slate-400">Used in: 1C (Registration), 3B (MCQ), 4C (Auth), 5C (Table), 6A (Update), 7B (Room Booking)</p>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{`// Step 1: Load Derby Client Driver
Class.forName("org.apache.derby.jdbc.ClientDriver");

// Step 2: Establish Connection to Java DB on port 1527
try (Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527/<dbName>", "root", "root")) {

    // Step 3: Prepare Statement
    String sql = "INSERT INTO USERS (NAME, EMAIL) VALUES (?, ?)";
    try (PreparedStatement ps = con.prepareStatement(sql)) {
        
        // Step 4: Inject parameters (1-indexed!)
        ps.setString(1, name);
        ps.setString(2, email);
        
        // Step 5: Execute
        int rowsAffected = ps.executeUpdate(); // or ps.executeQuery() for SELECT
    }
}`}
        </pre>
      </div>

      {/* Formula 3: State Management (Cookies vs Session) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30">
            F3
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Formula 3: State Management (Cookies vs. HttpSession)</h2>
            <p className="text-xs text-slate-400">Used in: 2B (Cookies), 2C (Session), 4C (Login Session), 6B (EL Scopes)</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="p-3">Operation</th>
                <th className="p-3 text-cyan-400">Cookie (Client Browser)</th>
                <th className="p-3 text-purple-400">HttpSession (Server Memory)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-400">Create / Store</td>
                <td className="p-3">Cookie c = new Cookie("user", "val");<br/>response.addCookie(c);</td>
                <td className="p-3">HttpSession s = request.getSession();<br/>s.setAttribute("user", "val");</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-400">Read / Retrieve</td>
                <td className="p-3">Cookie[] arr = request.getCookies();<br/>for(Cookie c: arr) &#123; if(c.getName().equals(...)) &#125;</td>
                <td className="p-3">HttpSession s = request.getSession();<br/>String u = (String) s.getAttribute("user");</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-400">Destroy / Logout</td>
                <td className="p-3">c.setMaxAge(0);<br/>response.addCookie(c);</td>
                <td className="p-3">HttpSession s = request.getSession(false);<br/>if (s != null) s.invalidate();</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Formula 4: EJB 3.x Bean Patterns */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
            F4
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Formula 4: Enterprise JavaBeans (EJB) Trio</h2>
            <p className="text-xs text-slate-400">Used in: 7A (Stateless), 7B (Room), 7C (Stateful Cart), 8A (Singleton Hit), 8B (MDB)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold font-mono">@Stateless</span>
            <h3 className="font-bold text-white text-sm mt-2">Zero Client State</h3>
            <p className="text-xs text-slate-400 mt-1">Instances are pooled. Use for independent calculations, conversions, and DB utilities.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs font-bold font-mono">@Stateful</span>
            <h3 className="font-bold text-white text-sm mt-2">Per-Client Conversation</h3>
            <p className="text-xs text-slate-400 mt-1">Retains memory variables (e.g. ArrayList cart) for that specific user across requests.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">@Singleton</span>
            <h3 className="font-bold text-white text-sm mt-2">Application-Wide Unique</h3>
            <p className="text-xs text-slate-400 mt-1">Exactly one instance in memory. Shared across all users for hit counters, cache, and metrics.</p>
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
          <span className="text-amber-400 font-bold">Injecting any bean into a Servlet:</span>
          <p className="mt-1 text-slate-200">@EJB private MyBean bean; // No new keyword required!</p>
        </div>
      </div>

      {/* Formula 5: The ORM Persistence Loop */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm border border-rose-500/30">
            F5
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Formula 5: The ORM Persistence Loop (JPA & Hibernate)</h2>
            <p className="text-xs text-slate-400">Used in: 9A (Inventory JPA), 9B (Guestbook JPA), 10A (Associations), 10C (Hibernate)</p>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed">
{`// JPA Workflow (EntityManager)
EntityManager em = emf.createEntityManager();
try {
    em.getTransaction().begin();
    em.persist(entityObject);   // Save
    em.getTransaction().commit();
} finally {
    em.close();
}

// Hibernate Workflow (Session)
Session session = HibernateUtil.getSessionFactory().openSession();
Transaction tx = session.beginTransaction();
session.save(entityObject);     // Save
tx.commit();
session.close();`}
        </pre>
      </div>

      {/* NetBeans 8.2 Shortcuts */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold text-sm">
          <Terminal className="w-4 h-4" />
          <span>NetBeans 8.2 Keyboard Shortcuts & Time Savers</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="font-mono font-bold text-cyan-400">Alt + Insert</span>
            <p className="text-slate-400 mt-1">Generates Getters/Setters, Constructors, toString automatically in any class.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="font-mono font-bold text-cyan-400">Ctrl + Shift + I</span>
            <p className="text-slate-400 mt-1">Fix Imports: automatically detects missing packages and adds imports.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="font-mono font-bold text-cyan-400">Ctrl + Space</span>
            <p className="text-slate-400 mt-1">Auto-complete method names, variable names, and code snippets.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="font-mono font-bold text-cyan-400">Shift + F6</span>
            <p className="text-slate-400 mt-1">Run specific file immediately without building entire project.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
