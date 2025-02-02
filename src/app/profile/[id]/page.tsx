import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getDeveloper } from '@/app/actions'
import type { Developer } from '@/types'
import { InquiryButton } from '@/components/InquiryButton'

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const dev = await getDeveloper(params.id)
  if (!dev) notFound()

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex align-items-start gap-4 mb-4">
            <Image
              src={dev.avatar}
              alt={`${dev.name.first} ${dev.name.last}`}
              width={96}
              height={96}
              className="rounded-circle"
              priority
              quality={95}
            />
            <div>
              <h1 className="h2 mb-2">{dev.name.first} {dev.name.last}</h1>
              <p className="text-muted mb-2">
                {dev.type} • {dev.location.city}, {dev.location.country}
              </p>
              <p className="mb-0">{dev.bio}</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="h4 mb-3">Experience</h2>
            {dev.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="h5 mb-2">{exp.role} at {exp.company}</h3>
                <p className="text-muted mb-2">{exp.period}</p>
                <ul className="list-unstyled">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="mb-2">• {achievement}</li>
                  ))}
                </ul>
                {exp.technologies && (
                  <p className="mb-0">
                    <small className="text-muted">
                      Technologies: {Array.isArray(exp.technologies) ? exp.technologies.join(', ') : exp.technologies}
                    </small>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h5 mb-3">Contact options</h3>
              <InquiryButton dev={dev} />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="h5 mb-3">Can help you with:</h3>
            <ul className="list-unstyled">
              {dev.skills.map((skill, index) => (
                <li key={index} className="mb-2">
                  <span className="text-muted">• </span>{skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 