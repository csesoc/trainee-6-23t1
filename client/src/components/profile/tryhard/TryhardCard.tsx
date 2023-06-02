import styles from './Tryhard.module.css'

interface cardProps {
  children: React.ReactNode
}

const TryhardCard = ({ children }: cardProps) => {

  return (
    <div className={styles.cardOuter}>
      <div className={styles.cardInner}>
        {children}
      </div>
    </div>
  )
}

export default TryhardCard