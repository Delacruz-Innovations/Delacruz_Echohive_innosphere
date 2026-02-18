import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Tearms_condition = () => {
  const heroRef = useRef(null)
  const paragraphsRef = useRef([])

  // Function to add refs to paragraphs
  const addToRefs = (el) => {
    if (el && !paragraphsRef.current.includes(el)) {
      paragraphsRef.current.push(el)
    }
  }

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )

    // Paragraph animations
    paragraphsRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="bg-black min-h-screen pt-35">
      {/* Hero */}
      <div 
        ref={heroRef}
        className=" md:py-35 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold text-center text-whites uppercase">
            Website Terms and Conditions of Use
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6">

        {/* Terms Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              1. Terms
            </h2>
            <p className="text-gray-200 leading-relaxed">
              By accessing this Website, accessible from our homepage, you are agreeing to be bound by these 
              Website Terms and Conditions of Use and agree that you are responsible for the agreement with 
              any applicable local laws. If you disagree with any of these terms, you are prohibited from 
              accessing this site.
            </p>
          </section>

          {/* Section 2 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              2. Use License
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on our Website for 
              personal, non-commercial transitory viewing only. This is the grant of a license, not a 
              transfer of title.
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on our Website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              3. Disclaimer
            </h2>
            <p className="text-gray-200 leading-relaxed">
              All the materials on our Website are provided "as is". We make no warranties, may it be 
              expressed or implied, therefore negates all other warranties. Furthermore, we do not make 
              any representations concerning the accuracy or reliability of the use of the materials on 
              our Website or otherwise relating to such materials or any sites linked to this Website.
            </p>
          </section>

          {/* Section 4 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              4. Limitations
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We or our suppliers will not be held accountable for any damages that will arise with the 
              use or inability to use the materials on our Website, even if we or an authorized 
              representative of this Website has been notified, orally or written, of the possibility 
              of such damage.
            </p>
          </section>

          {/* Section 5 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              5. Revisions and Errata
            </h2>
            <p className="text-gray-200 leading-relaxed">
              The materials appearing on our Website may include technical, typographical, or photographic 
              errors. We will not promise that any of the materials in this Website are accurate, complete, 
              or current. We may change the materials contained on our Website at any time without notice.
            </p>
          </section>

          {/* Section 6 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              6. Links
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We have not reviewed all of the sites linked to our Website and are not responsible for the 
              contents of any such linked site. The presence of any link does not imply endorsement by 
              us of the site. The use of any linked website is at the user's own risk.
            </p>
          </section>

          {/* Section 7 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              7. Terms of Use Modifications
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We may revise these Terms of Use for our Website at any time without prior notice. By using 
              this Website, you are agreeing to be bound by the current version of these Terms and 
              Conditions of Use.
            </p>
          </section>

          {/* Section 8 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              8. Your Privacy
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Please read our Privacy Policy. Your privacy is important to us, and we are committed to 
              protecting your personal information.
            </p>
          </section>

          {/* Section 9 */}
          <section ref={addToRefs}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              9. Governing Law
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Any claim related to our Website shall be governed by the laws of the United States without 
              regards to its conflict of law provisions.
            </p>
          </section>


        </div>
      </div>
    </div>
  )
}

export default Tearms_condition