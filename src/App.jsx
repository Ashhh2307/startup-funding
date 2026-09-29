import React, { useState, useEffect } from 'react'
import './App.css'
import { Demo } from './components/ui/demo'
import { supabase } from './supabase'

const NICHES = ['Healthcare', 'Fintech', 'EdTech', 'SaaS', 'E-commerce', 'AI / ML', 'CleanTech', 'BioTech']
const SIZES = ['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees']
const REGIONS = ['Asia', 'North America', 'Europe', 'South America', 'Africa', 'Australia / Oceania', 'Middle East']
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i))
const VALUATIONS = ['Pre-Seed (<$500K)', 'Seed ($500K–$2M)', 'Series A ($2M–$15M)', 'Series B ($15M–$50M)', 'Series C ($50M–$100M)', 'Series D+ ($100M+)']
const MARKETS = ['SMB', 'Enterprise', 'Consumer (B2C)', 'Government', 'Healthcare Providers']

const SCHEMES_LIST = [
  {
    name: "Startup India Seed Fund Scheme (SISFS)",
    desc: "Provides financial assistance to startups for proof of concept, prototype development, product trials, and market entry.",
    link: "https://seedfund.startupindia.gov.in/"
  },
  {
    name: "Y Combinator",
    desc: "A startup fund and program that invests $500,000 in early-stage startups twice a year.",
    link: "https://www.ycombinator.com/"
  },
  {
    name: "Small Business Innovation Research (SBIR)",
    desc: "A highly competitive program that encourages domestic small businesses to engage in Federal R&D with potential for commercialization.",
    link: "https://www.sbir.gov/"
  },
  {
    name: "Horizon Europe",
    desc: "The EU's key funding programme for research and innovation with a budget of €95.5 billion.",
    link: "https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en"
  },
  {
    name: "Surge by Peak XV Partners",
    desc: "A rapid scale-up program for early-stage startups in India and Southeast Asia, offering $1M–$3M in seed capital.",
    link: "https://www.surgeahead.com/"
  }
]

const COMPANIES_LIST = [
  {
    name: "Sequoia Capital",
    domain: "sequoiacap.com",
    desc: "Focuses on technology, healthcare, and financial sectors across all stages of company growth.",
    link: "https://www.sequoiacap.com/"
  },
  {
    name: "Andreessen Horowitz",
    domain: "a16z.com",
    desc: "Backs bold entrepreneurs building the future through technology spanning crypto to biotech.",
    link: "https://a16z.com/"
  },
  {
    name: "Accel",
    domain: "accel.com",
    desc: "Early and growth-stage venture capital firm that partners with exceptional founders.",
    link: "https://www.accel.com/"
  },
  {
    name: "Lightspeed",
    domain: "lsvp.com",
    desc: "Global multi-stage venture capital firm focused on enterprise, consumer, and health.",
    link: "https://lsvp.com/"
  },
  {
    name: "Index Ventures",
    domain: "indexventures.com",
    desc: "European and San Francisco-based VC firm investing in technology companies at all stages.",
    link: "https://www.indexventures.com/"
  }
]

const PAPERS_LIST = [
  {
    title: "Why the Lean Startup Changes Everything",
    author: "Steve Blank, Harvard Business Review",
    desc: "A canonical paper explaining how the lean startup methodology can make starting a business less risky.",
    link: "https://hbr.org/2013/05/why-the-lean-startup-changes-everything"
  },
  {
    title: "The Founder's Dilemmas",
    author: "Noam Wasserman, HBR",
    desc: "Explores the early decisions that founders make which can make or break a startup.",
    link: "https://hbr.org/2008/02/the-founders-dilemma"
  },
  {
    title: "Venture Capital and the Professionalization of Start-up Firms",
    author: "Thomas Hellmann & Manju Puri",
    desc: "Empirical evidence on how venture capital involvement influences the professionalization of startups.",
    link: "https://academic.oup.com/rfs/article-abstract/15/1/169/1592965"
  },
  {
    title: "How Venture Capitalists Make Decisions",
    author: "Paul A. Gompers et al.",
    desc: "Extensive survey of VCs detailing how they source, select, and value startup investments.",
    link: "https://www.nber.org/papers/w22587"
  },
  {
    title: "The Economics of Venture Capital Firm Operations",
    author: "Steven N. Kaplan",
    desc: "Research examining the structures, returns, and strategies of successful VC firms and their portfolio companies.",
    link: "https://www.nber.org/papers/w14392"
  }
]

const VIDEOS_LIST = [
  {
    creator: "Naval Ravikant",
    title: "How to Get Rich (Without Getting Lucky)",
    desc: "A sprawling masterclass on wealth creation, specific knowledge, leverage, and making better decisions.",
    link: "https://www.youtube.com/watch?v=1-TZqOsVCNM",
    duration: "3:22:21"
  },
  {
    creator: "Naval Ravikant",
    title: "The Joe Rogan Experience #1309",
    desc: "A wide-ranging conversation explaining compound interest, peace of mind, and modern business philosophy.",
    link: "https://www.youtube.com/watch?v=3qHkcs3kG44",
    duration: "2:11:47"
  },
  {
    creator: "Alex Hormozi",
    title: "How To Build A $100M Business From Scratch",
    desc: "A deep dive into creating irresistible offers and using value-driven frameworks to scale hyper-profitably.",
    link: "https://www.youtube.com/watch?v=qM18rPE5aHk",
    duration: "45:12"
  },
  {
    creator: "Alex Hormozi",
    title: "The 1 Skill That Makes You Unstoppable (Pricing Power)",
    desc: "Understanding why charging more actually gives you better customers and a scalable operation.",
    link: "https://www.youtube.com/watch?v=0W8oFvK6T44",
    duration: "31:45"
  },
  {
    creator: "Iman Gadzhi",
    title: "How To Start SMMA from $0 (Step-By-Step)",
    desc: "A beginner-friendly breakdown of how to build a social media marketing agency relying on contractor arbitrage.",
    link: "https://www.youtube.com/watch?v=cM5y7h0h2-M",
    duration: "52:10"
  },
  {
    creator: "Iman Gadzhi",
    title: "The Reality of Building an Agency",
    desc: "Discusses the harsh truths, growing pains, and mindset required to scale an online service business.",
    link: "https://www.youtube.com/watch?v=x9aM3W3oBf8",
    duration: "38:20"
  },
  {
    creator: "Sam Altman",
    title: "How to Succeed with a Startup",
    desc: "Stanford lecture exploring exactly what it takes to find product-market fit and execute aggressively.",
    link: "https://www.youtube.com/watch?v=0lJKucu6HIQ",
    duration: "46:25"
  }
]

/* ── Navbar ── */
function Navbar({ dark, onToggle, activeTab, onTabChange }) {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <span className="logo-bolt">⚡</span>
        <span className="logo-text">Power IQ</span>
      </div>

      {/* Tabs */}
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'funding' ? 'active' : ''}`}
          onClick={() => onTabChange('funding')}
        >
          Funding
        </button>
        <button 
          className={`nav-tab ${activeTab === 'schemes' ? 'active' : ''}`}
          onClick={() => onTabChange('schemes')}
        >
          Schemes
        </button>
        <button 
          className={`nav-tab ${activeTab === 'papers' ? 'active' : ''}`}
          onClick={() => onTabChange('papers')}
        >
          Papers
        </button>
        <button 
          className={`nav-tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => onTabChange('videos')}
        >
          Videos
        </button>
        <button 
          className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => onTabChange('profile')}
        >
          Profile
        </button>
      </div>

      {/* Theme toggle */}
      <button
        className="theme-toggle"
        onClick={onToggle}
        title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle theme"
      >
        <span className="toggle-track">
          <span className={`toggle-thumb${dark ? ' dark' : ''}`} />
        </span>
        <span className="toggle-icon">{dark ? '🌙' : '☀️'}</span>
      </button>
    </nav>
  )
}

/* ── Reusable field wrapper ── */
function FormField({ label, htmlFor, children }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}

/* ── Select ── */
function SelectField({ id, value, onChange, options }) {
  return (
    <div className="select-wrapper">
      <select id={id} className="form-select" value={value} onChange={e => onChange(e.target.value)}>
        <option value="" disabled>Select an option</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <span className="select-arrow">⌄</span>
    </div>
  )
}

/* ── Funding Slider ── */
function FundingSlider({ value, onChange }) {
  const min = 1000
  const max = 100000
  const pct = ((value - min) / (max - min)) * 100
  const fmt = v => `$ ${v / 1000}k`

  return (
    <div className="slider-container">
      <input
        type="range"
        id="funding-slider"
        className="slider"
        min={min}
        max={max}
        step={1000}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` }}
      />
      <div className="slider-labels">
        <span>$ 1k</span>
        <span className="slider-mid">{fmt(value)}</span>
        <span>$ 100k</span>
      </div>
    </div>
  )
}

/* ── Toast ── */
function Toast({ message, visible }) {
  return (
    <div className={`toast${visible ? ' toast-visible' : ''}`}>{message}</div>
  )
}


/* ── App ── */
export default function App() {
  const [dark, setDark] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [activeTab, setActiveTab] = useState('funding')
  const [showCompanies, setShowCompanies] = useState(false)
  const [user, setUser] = useState(null)
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setShowLogin(false)
        setTempName(session.user.user_metadata?.name || 'Startup Founder')
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setShowLogin(false)
        setTempName(session.user.user_metadata?.name || 'Startup Founder')
      } else {
        setShowLogin(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleUpdateName = async () => {
    if (!tempName.trim()) return
    setEditingName(false)
    await supabase.auth.updateUser({
      data: { name: tempName }
    })
  }

  const [orgName, setOrgName] = useState('')
  const [niche, setNiche] = useState('')
  const [funding, setFunding] = useState(50000)
  const [size, setSize] = useState('')
  const [region, setRegion] = useState('')
  const [year, setYear] = useState('')
  const [valuation, setValuation] = useState('')
  const [market, setMarket] = useState('')
  const [description, setDescription] = useState('')
  const [searching, setSearching] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })

  function showToast(msg) {
    setToast({ visible: true, message: msg })
    setTimeout(() => setToast({ visible: false, message: '' }), 3200)
  }

  const isFormFilled = orgName.trim() !== '' && niche !== '' && size !== '' && region !== '' && year !== '' && valuation !== '' && market !== '';

  function handleSearch() {
    if (!isFormFilled) {
      showToast('Please fill out all required fields.')
      return;
    }
    if (searching) return
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      showToast('✓ Search complete! Results are ready.')
    }, 1800)
  }

  const focusIn = () => setIsFocused(true)
  const focusOut = () => setIsFocused(false)

  return (
    <div className={`app${dark ? ' dark' : ''}${isFocused ? ' field-focused' : ''}`}>
      {showLogin ? (
        <Demo onSuccess={() => setShowLogin(false)} />
      ) : (
        <>
          <Navbar dark={dark} onToggle={() => setDark(d => !d)} activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="main">
            <div className="form-card">
              {activeTab === 'funding' ? (
                <>
                  <div className="form-row">
                <FormField label="Name of Organization" htmlFor="org-name">
                  <input
                    id="org-name"
                    className="form-input"
                    type="text"
                    value={orgName}
                    onChange={e => setOrgName(e.target.value)}
                    onFocus={focusIn}
                    onBlur={focusOut}
                    placeholder="Enter organization name"
                  />
                </FormField>
                <FormField label="Niche of Organization" htmlFor="niche">
                  <div onFocus={focusIn} onBlur={focusOut}>
                    <SelectField id="niche" value={niche} onChange={setNiche} options={NICHES} />
                  </div>
                </FormField>
              </div>

              <div className="form-row">
                <FormField label="Required Funding" htmlFor="funding-slider">
                  <div onFocus={focusIn} onBlur={focusOut}>
                    <FundingSlider value={funding} onChange={setFunding} />
                  </div>
                </FormField>
                <FormField label="Size of Startup" htmlFor="startup-size">
                  <div onFocus={focusIn} onBlur={focusOut}>
                    <SelectField id="startup-size" value={size} onChange={setSize} options={SIZES} />
                  </div>
                </FormField>
              </div>

              <div className="form-row">
                <FormField label="Region of Organization" htmlFor="region">
                  <div onFocus={focusIn} onBlur={focusOut}>
                    <SelectField id="region" value={region} onChange={setRegion} options={REGIONS} />
                  </div>
                </FormField>
                <FormField label="Founded in Year" htmlFor="founded-year">
                  <div onFocus={focusIn} onBlur={focusOut}>
                    <SelectField id="founded-year" value={year} onChange={setYear} options={YEARS} />
                  </div>
                </FormField>
              </div>

              <div className="form-row">
                <FormField label="Current Valuation" htmlFor="valuation">
                  <div onFocus={focusIn} onBlur={focusOut}>
                    <SelectField id="valuation" value={valuation} onChange={setValuation} options={VALUATIONS} />
                  </div>
                </FormField>
                <FormField label="Target Market" htmlFor="target-market">
                  <div onFocus={focusIn} onBlur={focusOut}>
                    <SelectField id="target-market" value={market} onChange={setMarket} options={MARKETS} />
                  </div>
                </FormField>
              </div>

              <div className="form-row full">
                <FormField label="Description (optional)" htmlFor="description">
                  <textarea
                    id="description"
                    className="form-textarea"
                    rows={5}
                    placeholder="Briefly describe your organization or funding needs..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </FormField>
              </div>

              <div className="form-actions">
                <button
                  id="search-btn"
                  className={`btn-search${searching ? ' btn-loading' : ''}`}
                  onClick={handleSearch}
                  disabled={searching}
                >
                  {searching ? 'Searching…' : 'Search'}
                </button>
              </div>

              {/* ── User Summary ── */}
              {isFormFilled && (
                <div className="user-summary">
                  <h3 className="summary-title">Organization Summary</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Name</span>
                      <span className="summary-value">{orgName}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Niche</span>
                      <span className="summary-value">{niche}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Required Funding</span>
                      <span className="summary-value">$ {funding / 1000}k</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Team Size</span>
                      <span className="summary-value">{size}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Region</span>
                      <span className="summary-value">{region}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Founded</span>
                      <span className="summary-value">{year}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Valuation</span>
                      <span className="summary-value">{valuation}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Market</span>
                      <span className="summary-value">{market}</span>
                    </div>
                  </div>
                  {description && (
                    <div className="summary-desc">
                      <span className="summary-label">Description</span>
                      <p className="summary-desc-text">{description}</p>
                    </div>
                  )}

                  <div className="companies-action">
                    <button 
                      className="btn-view-companies" 
                      onClick={() => setShowCompanies(!showCompanies)}
                    >
                      {showCompanies ? 'Hide Companies' : 'View Companies'}
                    </button>
                  </div>

                  {showCompanies && (
                    <div className="companies-section">
                      <h4 className="companies-title">Top Venture Capital Firms</h4>
                      <p className="companies-subtitle">Leading organizations that might be interested in your profile.</p>
                      
                      <div className="companies-grid">
                        {COMPANIES_LIST.map((company) => (
                          <a 
                            key={company.name}
                            href={company.link}
                            target="_blank"
                            rel="noreferrer"
                            className="company-card"
                          >
                            <div className="company-header">
                              <div className="company-logo-wrap">
                                <img 
                                  src={`https://logo.clearbit.com/${company.domain}?size=100`} 
                                  alt={`${company.name} logo`} 
                                  className="company-logo"
                                  onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23e8622a"><path d="M12 2L2 22h20L12 2z"/></svg>' 
                                  }}
                                />
                              </div>
                              <h5 className="company-name">{company.name}</h5>
                            </div>
                            <p className="company-desc">{company.desc}</p>
                            <span className="company-link-text">Visit Website ➜</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
                </>
              ) : activeTab === 'schemes' ? (
                <div className="schemes-container">
                  <h2 className="schemes-title">Startup Funding Schemes</h2>
                  <p className="schemes-subtitle">Explore official funding schemes available for your startup.</p>
                  
                  <div className="schemes-list">
                    {SCHEMES_LIST.map(scheme => (
                      <a href={scheme.link} target="_blank" rel="noreferrer" className="scheme-card" key={scheme.name}>
                        <h3 className="scheme-name">{scheme.name}</h3>
                        <p className="scheme-desc">{scheme.desc}</p>
                        <span className="scheme-link-text">Visit Official Site ➜</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'papers' ? (
                <div className="papers-container">
                  <h2 className="papers-title">Founder Research Papers</h2>
                  <p className="papers-subtitle">Curated academic and industry research on startup success, VC dynamics, and lean methodologies.</p>
                  
                  <div className="papers-list">
                    {PAPERS_LIST.map((paper, idx) => (
                      <a href={paper.link} target="_blank" rel="noreferrer" className="paper-card" key={idx}>
                        <h3 className="paper-title">{paper.title}</h3>
                        <div className="paper-author">{paper.author}</div>
                        <p className="paper-desc">{paper.desc}</p>
                        <span className="paper-link-text">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          Read Full Paper ➜
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'videos' ? (
                <div className="videos-container">
                  <h2 className="videos-title">Founder Masterclasses</h2>
                  <p className="videos-subtitle">Curated high-value YouTube videos from top entrepreneurs.</p>
                  
                  <div className="videos-list">
                    {VIDEOS_LIST.map((video, idx) => (
                      <a href={video.link} target="_blank" rel="noreferrer" className="video-card" key={idx}>
                        <div className="video-creator">{video.creator}</div>
                        <h3 className="video-title">{video.title}</h3>
                        <p className="video-desc">{video.desc}</p>
                        <div className="video-footer">
                          <span className="video-link-text">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                            Watch Video
                          </span>
                          <span className="video-duration">{video.duration}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="profile-container">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h2 className="profile-title">User Profile</h2>
                      <p className="profile-subtitle">Manage your account and view registered companies.</p>
                    </div>
                  </div>
                  
                  <div className="profile-section">
                    <h3 className="profile-section-title">Account Details</h3>
                    <div className="profile-field">
                      <span className="profile-label">Full Name</span>
                      {editingName ? (
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                          <input 
                            type="text" 
                            style={{padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', width: '200px', fontSize: '14px', outline: 'none'}}
                            value={tempName} 
                            onChange={e => setTempName(e.target.value)} 
                            autoFocus
                          />
                          <button onClick={handleUpdateName} style={{background: 'var(--accent)', color: 'white', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', border: 'none'}}>Save</button>
                          <button onClick={() => setEditingName(false)} style={{background: 'transparent', color: 'var(--label-color)', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', border: 'none'}}>Cancel</button>
                        </div>
                      ) : (
                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                          <span className="profile-value">{user?.user_metadata?.name || 'Startup Founder'}</span>
                          <button onClick={() => setEditingName(true)} style={{background: 'rgba(232, 98, 42, 0.1)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none'}}>Edit</button>
                        </div>
                      )}
                    </div>
                    <div className="profile-field">
                      <span className="profile-label">Email Address</span>
                      <span className="profile-value">{user?.email || "Not signed in"}</span>
                    </div>
                    <div className="profile-field">
                      <span className="profile-label">Password</span>
                      <span className="profile-value">••••••••••••</span>
                    </div>
                  </div>

                  <div className="profile-section">
                    <h3 className="profile-section-title">Registered Companies</h3>
                    <div className="profile-companies">
                      {orgName && isFormFilled ? (
                        <div className="profile-company-card">
                          <div className="company-icon">🏢</div>
                          <div className="company-details">
                            <div className="company-name">{orgName}</div>
                            <div className="company-meta">{niche} • {region}</div>
                          </div>
                          <span className="company-status">Active</span>
                        </div>
                      ) : null}
                      
                      <div className="profile-company-card" style={{opacity: isFormFilled ? 0.6 : 1}}>
                        <div className="company-icon pb-0 text-2xl" style={{ border: 'none' }}>🏢</div>
                        <div className="company-details">
                          <div className="company-name">Demo Technologies Inc.</div>
                          <div className="company-meta">SaaS • North America</div>
                        </div>
                        <span className="company-status" style={{background: 'rgba(0,0,0,0.05)', color: 'var(--label-color)'}}>Verified</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="profile-actions">
                    <button 
                      className="btn-logout"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setShowLogin(true);
                        setActiveTab('funding');
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>

          <Toast message={toast.message} visible={toast.visible} />
        </>
      )}
    </div>
  )
}
