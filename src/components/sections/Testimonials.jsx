import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { reviews } from "../../data/reviews";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-bg-dark py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-1/4 h-72 w-72 rounded-full bg-gold-primary/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-gold-primary/5 blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-primary/20 bg-gold-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-primary"
          >
            <Star size={12} className="fill-gold-primary" /> Guest Experiences
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-serif text-4xl text-text-base sm:text-5xl md:text-6xl"
          >
            Voices of <span className="italic text-gold-primary">The Nova Table</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-text-muted"
          >
            A few words from the guests who've made The Nova Table part of their routine.
          </motion.p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="testimonial-swiper !pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="max-w-[420px]">
              <motion.div whileHover={{ y: -8 }} className="group relative h-full">
                <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-gold-primary/20 to-transparent opacity-0 blur transition duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border-subtle bg-surface p-8 shadow-2xl backdrop-blur-xl md:p-9">
                  <Quote
                    className="absolute right-8 top-6 text-gold-primary/10 transition-colors group-hover:text-gold-primary/20"
                    size={72}
                  />

                  <div className="relative z-10">
                    <div className="mb-7 flex items-center justify-between">
                      <div className="flex gap-1 text-gold-primary">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>
                      <span className="rounded-full bg-bg-main/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {review.category || "Review"}
                      </span>
                    </div>

                    <p className="mb-9 text-lg font-light italic leading-relaxed text-text-base/90">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-4 border-t border-border-subtle pt-6">
                    <div className="relative">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="h-13 w-13 rounded-2xl border-2 border-gold-primary/20 object-cover transition-colors duration-500 group-hover:border-gold-primary"
                      />
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-bg-dark bg-gold-primary p-0.5 text-black">
                          <CheckCircle2 size={12} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-text-base transition-colors group-hover:text-gold-primary">
                        {review.name}
                      </h4>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {review.role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
